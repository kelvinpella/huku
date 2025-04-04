import { getAuthOptions } from '@/common/functions/getAuthOptions'
import { MenuItem } from '@headlessui/react'
import Link from 'next/link' 

export default function SignupOptions() {
  const signupOptions = getAuthOptions()

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
            <button className="w-full flex items-center gap-3 outline-none">
              {icon} {label}
            </button>
          )}
        </MenuItem>
      ))}</>
  )
}
