import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { capitalizeFirstLetter } from "@/lib/utils";

type Props = {
  city: string;
  restaurantName?: string;
};

const Bread = ({ city, restaurantName }: Props) => {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          {restaurantName ? (
            <BreadcrumbLink href={`/search/${city}`}>
              {capitalizeFirstLetter(city)}
            </BreadcrumbLink>
          ) : (
            <BreadcrumbItem>
              <BreadcrumbPage>{capitalizeFirstLetter(city)}</BreadcrumbPage>
            </BreadcrumbItem>
          )}
        </BreadcrumbItem>
        {restaurantName && (
          <>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{restaurantName}</BreadcrumbPage>
            </BreadcrumbItem>
          </>
        )}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default Bread;
