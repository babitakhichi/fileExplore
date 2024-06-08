

import PublicLayout from "../layout";
import route from "./route";


export const routes = () => {
  return [
    {
      element: <PublicLayout />,
      children: [...route()],
    },
  ];
};
