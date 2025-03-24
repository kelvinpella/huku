
import RegistrationWelcomeText from './RegistrationWelcomeText'
import RegistrationMenu from './RegistrationMenu'

export default function LandingPage() {
  return (
    <div className='w-full min-h-screen flex flex-col items-center justify-center p-2'>
        <RegistrationWelcomeText/>
        <RegistrationMenu/>
    </div>
  )
}
