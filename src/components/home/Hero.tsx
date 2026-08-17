// src/components/home/Hero.tsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// import boySmiling from "@/assets/images/gallery-boy-smiling.jpg";
// import manBoxes from "@/assets/images/gallery-man-boxes.jpg";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";

export function Hero() {
  const [isDonateModalOpen, setIsDonateModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleDonateChoice = (path: "/donate" | "/food-donation") => {
    setIsDonateModalOpen(false);
    navigate(path);
  };

  return (
    <section className="pb-16 pt-[84px]">
      <div className="container-page">
        <h1 className="flex flex-wrap items-center gap-x-4 gap-y-3 break-words font-display text-5xl font-extrabold leading-[1.05] tracking-[-0.02em] text-ink sm:gap-x-6 sm:text-6xl lg:text-[96px] lg:leading-[1.02] lg:tracking-[-0.035em]">
          <span>Connecting people</span>
          {/* <span className="inline-block h-[54px] w-[110px] overflow-hidden rounded-[20px] border-[1.5px] border-ink align-middle sm:h-[76px] sm:w-[150px]">
            <img src={boySmiling} alt="" className="h-full w-full object-cover" />
          </span> */}
          <span>with</span>
          <span>communities</span>
          {/* <span className="inline-block h-[54px] w-[110px] overflow-hidden rounded-[20px] border-[1.5px] border-ink align-middle sm:h-[76px] sm:w-[150px]">
            <img src={manBoxes} alt="" className="h-full w-full object-cover" />
          </span> */}
          <span>facing</span>
          <span>food insecurity.</span>
        </h1>

        <div className="mt-12 flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
          <p className="max-w-[604px] font-body text-lg leading-relaxed text-ink sm:text-xl">
            Millions of Nigerians don't know where their next meal is coming
            from. holdbodí community support connects individuals, brands, and volunteers to
            support people and communities who need food.
          </p>
          <div className="flex shrink-0 items-center gap-4">
            <Button
              variant="secondary"
              size="lg"
              className="rounded-none"
              onClick={() => setIsDonateModalOpen(true)}
            >
              Donate
            </Button>
            <Link to="/volunteer">
              <Button variant="outline" size="lg" className="rounded-none">
                Volunteer
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <Modal
        isOpen={isDonateModalOpen}
        onClose={() => setIsDonateModalOpen(false)}
        title="What would you like to donate?"
      >
        <div className="flex flex-col gap-3">
          <Button
            variant="secondary"
            size="lg"
            className="w-full rounded-none"
            onClick={() => handleDonateChoice("/donate")}
          >
            Funds
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="w-full rounded-none"
            onClick={() => handleDonateChoice("/food-donation")}
          >
            Food
          </Button>
        </div>
      </Modal>
    </section>
  );
}