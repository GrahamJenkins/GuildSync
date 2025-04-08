# Discord Bot Setup Guide

This guide explains how to create a Discord application, add a bot, generate an invite link with the correct permissions, and add the bot to your server.

---

## 1. Create a Discord Application

- Visit the [Discord Developer Portal](https://discord.com/developers/applications)
- Click **"New Application"**
- Enter a name and click **"Create"**

---

## 2. Add a Bot User

- In your application, navigate to the **Bot** tab
- Click **"Add Bot"** and confirm
- (Optional) Set a username and avatar
- **Important:**
  - Enable **"Public Bot"** if you want to invite it to other servers
  - Disable **"Require OAuth2 Code Grant"** unless you need OAuth2 authorization code flow (most bots do not)

---

## 3. Get Your Bot Token

- Under the **Bot** tab, click **"Reset Token"** if needed
- Copy the **token** and keep it secure
- Add this token to your `.env` file as specified in the README

---

## 4. Generate an Invite Link

Use this template:

```
https://discord.com/oauth2/authorize?client_id=YOUR_CLIENT_ID&scope=bot&permissions=535260821568
```

Replace `YOUR_CLIENT_ID` with your application's **Client ID** (found on the **General Information** page).

---

## 5. Recommended Permissions

The permissions integer `534723950656` includes:

| Permission                 | Why Needed                                         |
|----------------------------|----------------------------------------------------|
| View Channels              | To read messages                                   |
| Send Messages              | To send translations                               |
| Manage Messages            | To delete or pin messages if needed                |
| Manage Webhooks            | To create and manage webhooks for sender impersonation |
| Embed Links                | To send rich embeds                                |
| Attach Files               | To send images or files                            |
| Read Message History       | To access past messages for context                |
| Add Reactions              | To react for inline translation triggers           |
| Use Application Commands   | For slash commands                                 |

You can customize permissions using the [Discord Permissions Calculator](https://discordapi.com/permissions.html#).

---

### Privileged Intents

This bot **requires** the **Message Content privileged intent** to process and bridge messages. Without this intent enabled, the bot **will not function** as intended.

Bots in **fewer than 100 servers** can use this intent without approval. However, once a bot reaches **75 servers**, it becomes eligible to apply for verification.
Bots **must be verified and approved before exceeding 100 servers**; otherwise, access to the Message Content intent will be disabled, and the bot will stop working properly.

For more details, refer to the [Message Content Privileged Intent FAQ](https://support-dev.discord.com/hc/en-us/articles/4404772028055-Message-Content-Privileged-Intent-FAQ).

---

---

## 6. Invite the Bot to Your Server

- You **must** have **Manage Server** permission on the target server
- Open the generated invite URL
- Select your server
- Approve the permissions
- Complete CAPTCHA if prompted

---

## 7. Run Your Bot

- Start your bot locally (e.g., `yarn start`)
- The bot should appear **online** in your server

---

## 8. Troubleshooting

- **Bot not showing up?** Make sure it is running and the token is correct
- **OAuth2 link not working?** Check `client_id`, `scope=bot`, and permissions
- **Bot was banned?** Unban it before reinviting
- **No "Add Bot" button?** You might be on the wrong tab or lack permissions