export const RESUME_FILE_NAME = 'Siddhant_Gupta_Resume.pdf'
export const RESUME_URL = `/assets/resumes/${RESUME_FILE_NAME}`

export type ResumeDownloadResult =
  | { ok: true; message: string }
  | { ok: false; message: string }

export async function downloadResume(): Promise<ResumeDownloadResult> {
  try {
    const response = await fetch(RESUME_URL, { cache: 'no-store' })

    if (!response.ok) {
      return {
        ok: false,
        message: 'Resume file is missing. Add it to public/assets/resumes.',
      }
    }

    const blob = await response.blob()
    const url = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = RESUME_FILE_NAME
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    window.URL.revokeObjectURL(url)

    return { ok: true, message: 'Resume download started.' }
  } catch {
    return {
      ok: false,
      message: 'Could not download resume. Please try again.',
    }
  }
}
