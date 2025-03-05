import { QuartzComponentProps } from "../../components/types"
import style from "./style.module.scss"

export function Footer({ displayClass }: QuartzComponentProps) {
  return (
    <footer class={`${displayClass ?? ""} ${style.footer}`}>
      <hr />
      <p>© 2023 Bananarama - All Rights Reserved</p>
      {/* Add any other elements you want in your footer */}
    </footer>
  )
}

// Add this to expose the CSS to Quartz
Footer.css = style 