"use client";
import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useState } from "react";

const Cta = () => {
  const [open, setOpen] = useState(false);
  return (
    <section>
      <div className="border-y border-border">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 xl:px-16">
          <div className="border-x border-border h-16" />
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 lg:px-8 xl:px-16">
        <div className="border-x border-border flex items-center justify-center px-4 py-20 lg:py-41.5 lg:max-h-125 h-full">
          <div className="flex flex-col gap-6 items-center text-center">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-foreground uppercase tracking-tight">
              Your next big idea
              <span className="flex flex-wrap items-center justify-center gap-3">
                Deserves
                <Dialog open={open} onOpenChange={setOpen}>
                  <DialogTrigger className="w-17.5 h-9 cursor-pointer">
                    <img
                      src="https://images.shadcnspace.com/assets/backgrounds/cta-5-sml.webp"
                      alt="video"
                      className="cursor-pointer h-full w-full"
                    />
                  </DialogTrigger>
                  <DialogContent className="max-w-5xl! w-full p-0 overflow-hidden rounded-none">
                    {open && (
                      <div className="aspect-video">
                        <iframe
                          className="w-full h-full"
                          src="https://www.youtube.com/embed/n6dvjVxy02U?autoplay=1&mute=1&rel=0"
                          title="YouTube video"
                          allow="autoplay; encrypted-media"
                          allowFullScreen
                        />
                      </div>
                    )}
                  </DialogContent>
                </Dialog>
                Great design
              </span>
            </h2>
            <Button className="group w-fit h-auto px-5 py-2.5 flex items-center gap-2 rounded-full cursor-pointer hover:bg-primary/80">
              <ArrowUpRight
                size={16}
                className="transition-all duration-300 group-hover:rotate-45"
              />
              Subscribe
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cta;