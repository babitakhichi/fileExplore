import { Download, Files, Home,  Picture } from "../pages";


export default function route() {
  return [
    {
      path: "/",
      name: "home",
      key: "/",

      element: <Download />,
    },
    {
      path: "/download",
      name: "Download",
      key: "/download",

      element: <Download />,
    },
    {
      path: "/files",
      name: "Files",
      key: "/files",

      element: <Download />,
    }, {
      path: "/picture",
      name: "Picture",
      key: "/picture",

      element: <Download />,
    },
  ];
}
