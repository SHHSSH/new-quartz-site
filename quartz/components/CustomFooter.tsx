import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import style from "./styles/footer.scss"

// Create a component that follows the exact Quartz pattern
export default ((opts?: any) => {
  const Footer: QuartzComponent = ({ displayClass }: QuartzComponentProps) => {
    // Return an empty fragment (nothing will be rendered)
    return <></>
    
    // Alternatively, return your custom content if you want a footer:
    // return (
    //   <footer class={`${displayClass ?? ""}`}>
    //     <p>© 2023 Bananarama - All Rights Reserved</p>
    //   </footer>
    // )
  }

  Footer.css = style
  return Footer
}) satisfies QuartzComponentConstructor 