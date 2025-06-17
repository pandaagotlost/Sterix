import * as fs from "fs"
import * as crypto from "crypto"
import * as dotenv from "dotenv"

// Load existing environment variables
dotenv.config()

// Generate a secure NextAuth secret
const nextAuthSecret = crypto.randomBytes(32).toString("base64")

// Define the `.env.local` file path
const envFilePath = ".env.local"

// Read existing `.env.local` content
let envContent = ""
if (fs.existsSync(envFilePath)) {
  envContent = fs.readFileSync(envFilePath, "utf-8")
}

// Update or add `NEXTAUTH_SECRET`
const updatedEnv = envContent.includes("NEXTAUTH_SECRET=")
  ? envContent.replace(/NEXTAUTH_SECRET=.*/g, `NEXTAUTH_SECRET=${nextAuthSecret}`)
  : `${envContent}\nNEXTAUTH_SECRET=${nextAuthSecret}`

fs.writeFileSync(envFilePath, updatedEnv.trim() + "\n")

console.log("✅ Successfully generated and added NEXTAUTH_SECRET to .env.local")
