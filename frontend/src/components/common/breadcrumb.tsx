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

export default function DynamicBreadcrumd() {
  const location = useLocation();
  const paths = location.pathname.split("/").filter(Boolean);

  return (
    <Breadcrumb className="mb-2">
      <BreadcrumbList>
        <BreadcrumbItem>
          <Link to="/">Home</Link>
        </BreadcrumbItem>
        {paths.length > 0 && (
          <BreadcrumbSeparator>
            <Slash />
          </BreadcrumbSeparator>
        )}
        {paths.map((path, index) => (
          <React.Fragment key={index}>
            <BreadcrumbItem>
              {index < path.length - 2 ? (
                <Link to={`/${paths.slice(0, index + 1).join("/")}`}>
                  {path.charAt(0).toUpperCase() + path.slice(1)}
                </Link>
              ) : (
                <BreadcrumbPage>
                  {path.charAt(0).toUpperCase() + path.slice(1)}
                </BreadcrumbPage>
              )}
            </BreadcrumbItem>
            {index < paths.length - 1 && (
              <BreadcrumbSeparator>
                <Slash />
              </BreadcrumbSeparator>
            )}
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
