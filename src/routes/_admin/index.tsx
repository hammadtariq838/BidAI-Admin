import { Navigate, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute('/_admin/')({
  component: () => <Navigate to="/analytics" />
})