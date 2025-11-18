import { products } from "@/app/data/products";
import ProductCard from "@/components/common/ProductCard/ProductCard";
import ServicesList from "@/components/common/ServiceCard/ServicesList";

export default function Service() {
  return (
    <div className="max-w-[1400px] mx-auto px-5 py-10">
      <div className="bg-[#fafafa] py-[30px] border-[#eeeeee]">
        <h2 className="text-3xl font-bold mb-6 text-center">
          Reliable Solutions, Affordable Prices, Quality Assurance
        </h2>
        <p className="text-center text-lg font-[18px]">
          All Nani freelance services offer multiple solutions under one roof, 
          from website design to payment gateway integration and content marketing to ICO 
          listing. Look no further; we have everything you need.
        </p>
      </div>

      <div className="py-[50px]">
        <ServicesList
          services={[
            {
              id: 1,
              img: "https://allclonescript.com/assets/images/services_img/all-service.png",
              label: "All Service",
            },
            {
              id: 2,
              img: "https://allclonescript.com/assets/images/services_img/web-design.png",
              label: "Web Design & Dev",
            },
            {
              id: 3,
              img: "https://allclonescript.com/assets/images/services_img/website-optimization.png",
              label: "Website Optimization",
            },
            {
              id: 4,
              img: "https://allclonescript.com/assets/images/services_img/graphic-design.png",
              label: "Graphic Design",
            },
            {
              id: 5,
              img: "https://allclonescript.com/assets/images/services_img/marketing.png",
              label: "Ads & Marketing",
            },
            {
              id: 6,
              img: "https://allclonescript.com/assets/images/services_img/content-writing.png",
              label: "Content Writing",
            },
          ]}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}
