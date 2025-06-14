import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("edit/:id", "routes/edit.$id.tsx"),
  route("delete/:id", "routes/delete.$id.tsx"),
] satisfies RouteConfig;
