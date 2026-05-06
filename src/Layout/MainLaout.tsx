
import Navbar from '../Components/Navbar'
import { Outlet } from 'react-router-dom'
import Footer from '../Components/Footer'

export default function MainLaout() {
  return (
  <><div className="min-h-screen flex flex-col">

      <Navbar />

      {/* المحتوى */}
      <main className="flex-1">
        <Outlet />
      </main>

      <Footer />
      
    </div>
        </>

)
}
