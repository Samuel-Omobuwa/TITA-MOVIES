import { useEffect } from "react";

export function useKey(key, action) {
       useEffect(() => {
          const callBack = (e) => {
            if (e.code.toLowerCase() === key.toLowerCase()) {
              action();
            }
          };
      
          document.addEventListener("keydown", callBack);
      
          return () => {
            document.removeEventListener("keydown", callBack);
          };
        }, [key, action]);
}