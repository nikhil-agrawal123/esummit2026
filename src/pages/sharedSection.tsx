import Zonals from "./zonals";
import Events from "./events";
import Speakers from "./speakers";
import Sponsors from "./sponsors";

import bg from "../assets/zonals_background.webp";


interface sharedSectionProps {
    startTransition: (targetRoute: string) => void;
}

export default function SharedSection({ startTransition }: sharedSectionProps) {
    return (
        <div className="relative overflow-x-hidden">
            <div
                className="fixed inset-0 -z-10"
                style={{
                    backgroundImage: `url(${bg})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                }}
            />

            <Zonals />
            <Events startTransition={startTransition} />
            <Speakers />
            <Sponsors />

        </div>
    );
}