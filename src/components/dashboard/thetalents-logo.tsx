// import { lusitana } from './font';
import { lusitana } from '@/utils/font';
import { BriefcaseBusiness } from 'lucide-react';

export default function TheTalentLogo() {
  return (
    <div
      className={`${lusitana.className} flex flex-row items-center leading-none text-white`}
    >
      <BriefcaseBusiness className="h-8 w-8 flex-shrink-0" />
      <p className="flex-grow text-[30px] max-sm:text-center ml-4">
        TheTalents
      </p>
    </div>
  );
}
