// quartz/components/Peridot.tsx
import { QuartzComponentConstructor, QuartzComponentProps } from "./types"

function Peridot(props: QuartzComponentProps) {
  return (
    <div className="peridot-wrapper">
      <div 
        id="peridot-container" 
        style={{ 
          width: "100%", 
          height: "400px",
          borderRadius: "8px",
          overflow: "hidden",
          marginBottom: "2rem"
        }}
      ></div>
    </div>
  )
}

export default (() => {
  function PeridotComponent(props: QuartzComponentProps) {
    return <Peridot {...props} />
  }

  PeridotComponent.css = `
    .peridot-wrapper {
      width: 100%;
      position: relative;
    }
  `

  PeridotComponent.afterDOMLoaded = `
    // Load our peridot.js script
    const peridotScript = document.createElement('script');
    peridotScript.src = '/static/js/peridot.js';
    document.body.appendChild(peridotScript);
  `

  return PeridotComponent
}) satisfies QuartzComponentConstructor