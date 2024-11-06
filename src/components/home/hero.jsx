import Search from "../search";


const HeroComponent = () => {
    return (
        <div
            className="h-80 w-full bg-cover p-4 relative"
            style={{backgroundImage: "linear-gradient(to bottom, rgba(0, 0, 0, 0.15), rgba(0, 0, 0, 0.75)), url('assets/hero.webp')"}}
        >
            <div className="absolute bottom-0 left-0 p-4">
                <p className="text-white font-medium text-4xl mb-8 leading-relaxed">Connect, Share, Save Agriculture</p>
                <Search/>
            </div>
        </div>
    )
}

export default HeroComponent;