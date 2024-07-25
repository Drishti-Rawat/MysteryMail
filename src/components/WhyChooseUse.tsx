import { Check, Star } from "lucide-react";
import React from "react";
import Image from "next/image";

const WhyChooseUse = () => {
  return (
    <div className="bg-gradient-to-br from-black via-black to-blue-900  border-b border-slate-800 flex flex-col justify-center items-center  px-10 sm:px-4 text-slate-50 py-20 sm:py-28 space-y-3">
      <h2 className="md:text-3xl sm:text-2xl text-[16px]  my-6 md:my-10 font-extrabold  tracking-wide">
        Why Choose Our Platform?
      </h2>
      <div className="text-center text-[12px] sm:text-[14px] max-w-xl  ">
        <p>
          {" "}
          Our platform offers a secure and easy way to share and collect
          feedback anonymously. With our user-friendly interface, gather honest
          opinions effortlessly to make better decisions. Here’s why our
          platform stands out:
        </p>
      </div>

      <div className="flex flex-col justify-center items-center text-[12px] sm:text-[14px] space-y-8 text-slate-100">
        <ul className="mt-8 space-y-2 font-medium flex flex-col   text-start">
          <li className="flex gap-2 items-center text-left">
            <Check className="h-5 w-5 shrink-0 text-amber-400" />
            <span>Anonymous feedback ensures honest opinions.</span>
          </li>
          <li className="flex gap-2 items-center text-left">
            <Check className="h-5 w-5 shrink-0 text-amber-400" />
            <span>Easy to share and collect feedback.</span>
          </li>
          <li className="flex gap-2 items-center text-left">
            <Check className="h-5 w-5 shrink-0 text-amber-400" />
            <span>Secure and private.</span>
          </li>
        </ul>

        <div className="flex flex-col gap-3 justify-center items-center">
          <div className="flex -space-x-4">
            <span className="rounded-full border border-gray-200">
              <Image
                src="/User/user-1.png"
                alt="user"
                height={100}
                width={100}
                className="w-12 border-gray-300 border h-12 object-cover rounded-full"
              />
            </span>
            <span className="rounded-full border border-gray-200">
              <Image
                src="/User/user-2.png"
                alt="user"
                height={100}
                width={100}
                className="w-12 border-gray-300 border h-12 object-cover rounded-full"
              />
            </span>
            <span className="rounded-full border border-gray-200">
              <Image
                src="/User/user-3.png"
                alt="user"
                height={100}
                width={100}
                className="w-12 border-gray-300 border h-12 object-cover rounded-full"
              />
            </span>
            <span className="rounded-full border border-gray-200">
              <Image
                src="/User/user-4.jpg"
                alt="user"
                height={100}
                width={100}
                className="w-12 border-gray-300 border h-12 object-cover rounded-full"
              />
            </span>
            <span className="rounded-full border border-gray-200">
              <Image
                src="/User/user-5.jpg"
                alt="user"
                height={100}
                width={100}
                className="w-12 border-gray-300 border h-12 object-cover rounded-full"
              />
            </span>
          </div>

          <div className="flex justify-center items-center">
            <Star color="yellow" fill="yellow" width={20} />
            <Star color="yellow" fill="yellow" width={20} />
            <Star color="yellow" fill="yellow" width={20} />
            <Star color="yellow" fill="yellow" width={20} />
            <Star color="yellow" fill="yellow" width={20} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhyChooseUse;
