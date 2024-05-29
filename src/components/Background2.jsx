// import React, { useEffect, useRef } from 'react';
// import "./background2.css";

// const Background2 = () => {
//   const canvasRef = useRef(null);

//   useEffect(() => {
//     const loadFluidScript = () => {
//       if (window.innerWidth > 960) {
//         const script = document.createElement('script');
//         script.type = 'text/javascript';
//         script.src = 'https://cdn.jsdelivr.net/gh/Libero793/KNGURUWebsite3.0@latest/js/script.js';
//         script.onload = () => {
//           console.log('Fluid animation script loaded successfully.');
//         };
//         script.onerror = (error) => {
//           console.error('Error loading the fluid animation script:', error);
//         };
//         document.head.appendChild(script);
//       }
//     };

//     loadFluidScript();
//   }, []);

//   return (
//     <div className="fluidanimationCanvas">
//       <canvas id="fluidCanvas" className="fluidCanvas" ef={canvasRef}></canvas>
//     </div>
//   );
// };

// export default Background2;



import React, { useEffect } from 'react';
import "./background2.css"

export default function Background2() {
  
     useEffect(() => {
          if (window.screen.width > 960) {
            const head = document.head;
            const script = document.createElement('script');
            script.type = 'text/javascript';
            script.src = 'https://cdn.jsdelivr.net/gh/Libero793/KNGURUWebsite3.0@latest/js/script.js';
            head.appendChild(script);
            console.log('running fluid animation script');
          }
        }, []); // Empty dependency array ensures this runs once on mount

  return (
    <div>

     <div className="fluidanimationCanvas">
          <canvas id="fluidCanvas" className="fluidCanvas"></canvas>

     </div>


    </div>
  )
}
