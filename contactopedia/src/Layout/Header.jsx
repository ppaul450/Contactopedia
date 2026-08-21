import logo from '../Images/React-icon.svg.webp'

function Header() {
    return (
        <div className="py-2 pl-2 pt-2" style={{ borderBottom: "1px solid #777" }}>
            <img src={logo} height={36} width={36} />
            <span className="h2 pt-4 m-2 text-white-50">ContactOPedia</span>

        </div>
    )
}
export default Header;