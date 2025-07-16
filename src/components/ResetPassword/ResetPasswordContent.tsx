'use client'
import dynamic from "next/dynamic";
 

const DynamicComponentWithNoSSR = dynamic(() => import("./ResetPassword"), {
  ssr: false,
});
 
export default function ResetPasswordContent() {
  return <DynamicComponentWithNoSSR />;
}
