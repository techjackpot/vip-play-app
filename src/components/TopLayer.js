export default function TopLayer() {
  return (
    <div className="toplayer-container">
      <div className="logo-container">
        <img src="https://res.cloudinary.com/production/image/upload/v1725438698/Icons/VIP/logo.png" alt="vip" />
      </div>
      <div className="toplayer-controls">
        <a className="btn-wallet"><img src="https://res.cloudinary.com/production/image/upload/v1725439588/Icons/VIP/wallet.svg" alt="" /> $200,000.00</a>
        <a className="btn-login">Login</a>
      </div>
    </div>
  )
}