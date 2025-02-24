import warning_sign from "../assets/warning-sign.svg"
import '../Stylesheets/PageNotFound.css'

interface PageNotFoundProps {
    setVisible: (visible: boolean) => void;
}

export default function PageNotFound({ setVisible } : PageNotFoundProps) {
    setVisible(false);
  return (
    <>
        <div className="page-not-found">
            <img src={warning_sign} alt="Warning sign" className='warning-img'/>
            <h1>Page not found</h1>
        </div>
    </>
  )
}
