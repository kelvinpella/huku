import { getAuthOptions } from '@/common/functions/getAuthOptions'
import { signInWithSocialProvider } from '@/common/functions/signInWithSocialProvider'
import { AuthOption } from '@/typings'
import { MenuItem } from '@headlessui/react'
import Link from 'next/link' 

export default function SignupOptions() {
  const signupOptions = getAuthOptions()

const handleSocialLogin = (provider:AuthOption) => {
  signInWithSocialProvider(provider as Extract<AuthOption, "facebook" | "google">)
}
  return (
    < > {signupOptions.map(({ icon, value, label, type = "link" }) => (
        <MenuItem
          key={label}
          as="div"
          className="w-full py-2 px-4 data-[focus]:bg-purple-illusionist rounded"
        >
          {type === "link" ? (
            <Link
              href={`signup/${value}`}
              className="w-full flex items-center gap-3"
            >
              {icon} {label}
            </Link>
          ) : (
            <button onClick={()=>handleSocialLogin(value)} className="w-full flex items-center gap-3 outline-none">
              {icon} {label}
            </button>
          )}
        </MenuItem>
      ))}</>
  )
}
