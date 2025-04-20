import { Suspense } from "react";
import ListOutput from "@/app/components/listOutput.js";

export default function ListPage() {
  return (
    <Suspense fallback={<div className="p-8 text-gray-600">Loading shopping list...</div>}>
      <ListOutput />
    </Suspense>
  );
}
