import * as crypto from "crypto"
import * as fs from "fs"
import * as path from "path"

function generateSecret() {
  return crypto.randomBytes(32).toString("hex")
}

function updateEnvFile(secret: string) {
  const envPath = path.join(process.cwd(), ".env.local")
  let envContent = ""

  if (fs.existsSync(envPath)) {
    envContent = fs.readFileSync(envPath, "utf-8")
  }

  if (envContent.includes("NEXTAUTH_SECRET=")) {
    envContent = envContent.replace(/NEXTAUTH_SECRET=.*/, `NEXTAUTH_SECRET=${secret}`)
  } else {
    envContent += `\nNEXTAUTH_SECRET=${secret}`
  }

  fs.writeFileSync(envPath, envContent.trim() + "\n")
  console.log("✅ Generated and added NEXTAUTH_SECRET to .env.local")
}

const secret = generateSecret()
updateEnvFile(secret)
