import { Slash } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import React from "react";

export default function DynamicBreadcrumbs() {
  const location = useLocation();
  const paths = location.pathname.split("/").filter(Boolean);

  return (
    <Breadcrumb className="mb-5">
      <BreadcrumbList>
        <BreadcrumbItem>
          <Link to="/">Home</Link>
        </BreadcrumbItem>
        <BreadcrumbSeparator>
          <Slash />
        </BreadcrumbSeparator>
        {paths.map((path, index) => {
          if (index < paths.length - 1) {
            return (
              <React.Fragment key={index}>
                <BreadcrumbItem>
                  <Link to={`/${paths.slice(0, index + 1).join("/")}`}>
                    {path.charAt(0).toUpperCase() + path.slice(1)}
                  </Link>
                </BreadcrumbItem>
                {index < paths.length - 1 && (
                  <BreadcrumbSeparator>
                    <Slash />
                  </BreadcrumbSeparator>
                )}
              </React.Fragment>
            );
          } else {
            return (
              <React.Fragment key={index}>
                <BreadcrumbPage>
                  <Link to={`/${paths.slice(0, index + 1).join("/")}`}>
                    {path.charAt(0).toUpperCase() + path.slice(1)}
                  </Link>
                </BreadcrumbPage>
                {index < paths.length - 1 && (
                  <BreadcrumbSeparator>
                    <Slash />
                  </BreadcrumbSeparator>
                )}
              </React.Fragment>
            );
          }
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
