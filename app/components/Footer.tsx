import React from "react";

export default function Footer() {
  return (
    <div className="fixed md:py-2 bottom-0 z-[40] md:z-40 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700 h-[58px] flex items-center justify-center">
      <p className="text-[#606773] text-xsm text-center">
        Todos los derechos reservados © ({new Date().getFullYear()}) Colmena
        Seguros.
      </p>
    </div>
  );
}
