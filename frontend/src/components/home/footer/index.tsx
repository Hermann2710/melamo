import Container from "@/components/common/container";
import Newsletter from "./newsletter";
import FooterElement from "./footerElement";
import FooterTitle from "./footerTitle";

function HomeFooter() {
  return (
    <footer className="border-t bg-foreground">
      <Container>
        <Newsletter />
        <div className="text-muted grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12 pb-5">
          <FooterTitle />
          <FooterElement title="Element 1" links={[
            {title: "Link 1", path: "#"},
            {title: "Link 2", path: "#"},
            {title: "Link 3", path: "#"},
            {title: "Link 4", path: "#"},
          ]} />
          <FooterElement title="Element 2" links={[
            {title: "Link 1", path: "#"},
            {title: "Link 2", path: "#"},
            {title: "Link 3", path: "#"},
            {title: "Link 4", path: "#"},
          ]} />
          <FooterElement title="Element 3" links={[
            {title: "Link 1", path: "#"},
            {title: "Link 2", path: "#"},
            {title: "Link 3", path: "#"},
            {title: "Link 4", path: "#"},
          ]} />
        </div>
      </Container>
    </footer>
  );
}

export default HomeFooter;
