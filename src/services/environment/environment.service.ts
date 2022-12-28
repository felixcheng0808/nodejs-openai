import fs from 'fs'
import appRoot from 'app-root-path'
import { initOpenAI } from '@/services/openai.service'

export const init = async (): Promise<Boolean> => {
  console.log('[ENV] start init env')
  try {
    await initOpenAI()
    console.log('[ENV] init env success')
    return true
  } catch (err) {
    console.log(`[ENV] init Env error : ${err}`)
    return false
  }
}

export const getVersion = async () => {
  try {
    const _package = await fs.readFileSync(`${appRoot}/package.json`, 'utf-8')
    const jsonPackage = JSON.parse(_package)
    return jsonPackage.version
  } catch (err) {
    console.log(`[ENV] getVersion error : ${err}`)
    throw new Error(err)
  }
}
