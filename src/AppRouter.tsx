import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home, Gallery, Login, Wiki } from "./pages/pageIndex";
import Header from "./components/common/Header";
import RootPage from "./components/common/RootPage";
import { Props } from "./App";

export default function AppRouter({ email }: Props) {
  return (
    <BrowserRouter>
      <Header email={email} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/wiki" element={<Wiki />} />
        <Route path="/gallery" element={<Gallery />} />
      </Routes>
      <RootPage />
    </BrowserRouter>
  );
}
