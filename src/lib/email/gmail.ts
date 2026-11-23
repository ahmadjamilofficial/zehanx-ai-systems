import { connect } from "node:tls";

type Mail = { to: string; subject: string; text: string; replyTo?: string };

function encodeHeader(value: string) {
  return `=?UTF-8?B?${Buffer.from(value, "utf8").toString("base64")}?=`;
}

function encodeBody(value: string) {
  const encoded = Buffer.from(value, "utf8").toString("base64");
  return encoded.match(/.{1,76}/g)?.join("\r\n") ?? "";
}

export async function sendGmailMessages(messages: Mail[]) {
  const user = process.env.GMAIL_USER?.trim();
  const password = process.env.GMAIL_APP_PASSWORD?.replace(/\s/g, "");
  if (!user || !password || !messages.length) {
    throw new Error("Gmail SMTP is not configured.");
  }
  if (user.toLowerCase() !== "zehanxtech@gmail.com") {
    throw new Error("GMAIL_USER must be zehanxtech@gmail.com.");
  }

  const socket = connect({ host: "smtp.gmail.com", port: 465, servername: "smtp.gmail.com" });
  socket.setTimeout(15000);
  let buffer = "";
  const waiters: Array<{ resolve: (value: string) => void; reject: (error: Error) => void }> = [];

  socket.on("data", (chunk: Buffer | string) => {
    buffer += chunk.toString();
    const waiter = waiters[0];
    if (!waiter) return;
    const lines = buffer.split("\r\n");
    const end = lines.findIndex((line) => /^\d{3} /.test(line));
    if (end >= 0) {
      const reply = lines.slice(0, end + 1).join("\n");
      buffer = lines.slice(end + 1).join("\r\n");
      waiters.shift();
      waiter.resolve(reply);
    }
  });
  socket.on("timeout", () => socket.destroy(new Error("Gmail SMTP timed out.")));
  socket.on("error", (error) => {
    while (waiters.length) waiters.shift()?.reject(error);
  });

  const readReply = () => new Promise<string>((resolve, reject) => waiters.push({ resolve, reject }));
  const expect = async (code: number) => {
    const reply = await readReply();
    if (!reply.split("\n").at(-1)?.startsWith(String(code))) {
      throw new Error(`Gmail SMTP rejected a command: ${reply.slice(0, 300)}`);
    }
  };
  const command = async (value: string, code: number) => {
    const pending = expect(code);
    socket.write(value + "\r\n");
    await pending;
  };

  try {
    await new Promise<void>((resolve, reject) => {
      socket.once("secureConnect", resolve);
      socket.once("error", reject);
    });
    await expect(220);
    await command("EHLO zehanxtech.vercel.app", 250);
    await command("AUTH LOGIN", 334);
    await command(Buffer.from(user).toString("base64"), 334);
    await command(Buffer.from(password).toString("base64"), 235);

    for (const mail of messages) {
      const recipient = mail.to.trim();
      if (!/^[^\s<>@]+@[^\s<>@]+\.[^\s<>@]+$/.test(recipient)) {
        throw new Error("Invalid email recipient.");
      }
      await command(`MAIL FROM:<${user}>`, 250);
      await command(`RCPT TO:<${recipient}>`, 250);
      await command("DATA", 354);
      const headers = [
        `From: ZehanX Tech <${user}>`,
        `To: <${recipient}>`,
        `Subject: ${encodeHeader(mail.subject)}`,
        "MIME-Version: 1.0",
        "Content-Type: text/plain; charset=UTF-8",
        "Content-Transfer-Encoding: base64",
        ...(mail.replyTo ? [`Reply-To: <${mail.replyTo}>`] : []),
      ];
      const payload = [...headers, "", encodeBody(mail.text)].join("\r\n").replace(/(^|\r\n)\./g, "$1..");
      const pending = expect(250);
      socket.write(payload + "\r\n.\r\n");
      await pending;
    }
    await command("QUIT", 221);
  } finally {
    socket.end();
  }
}
