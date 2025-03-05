import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import style from "./styles/footer.scss"

export default ((opts?: any) => {
  const Footer: QuartzComponent = ({ displayClass }: QuartzComponentProps) => {
    return <></>  // Empty fragment = no content
  }

  Footer.css = style
  return Footer
}) satisfies QuartzComponentConstructor
