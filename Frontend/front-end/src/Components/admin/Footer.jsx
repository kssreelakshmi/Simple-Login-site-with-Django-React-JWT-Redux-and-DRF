import React from 'react'

const Footer = () => {
  return (
    <div className="bg-gray-800 text-white py-4 text-center">
      <p>&copy; {new Date().getFullYear()} Hodophile.</p>
    </div>
  )
}

export default Footer