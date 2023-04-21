import MapContainerProvider from "@/MapContext/MapContainer";
import PoblationLayer from "./components/layers/PoblationLayer";
interface Props {
  children: React.ReactNode;
}



export default function RootLayout({ children }: Props) {
  
  return (
    <MapContainerProvider>
      <PoblationLayer/>
      {children}
      </MapContainerProvider>
  );
}
