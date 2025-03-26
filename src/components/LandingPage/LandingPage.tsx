
import RegistrationWelcomeText from './RegistrationWelcomeText'
import RegistrationMenu from './RegistrationMenu'

export default function LandingPage() {
  return (
    <div className='w-full min-h-screen flex flex-col items-center justify-center lg:grid lg:grid-cols-2 grid-rows-1 lg:justify-start lg:gap-44'>
        <RegistrationWelcomeText/>
        <RegistrationMenu/>
    </div>
  )
}
