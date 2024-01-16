"use client"
import { useEffect, useState } from 'react'

type Coordinates = {
  latitude: number;
  longitude: number;
}

export default function Home() {
  const [coords, setCoords] = useState<Coordinates>({ latitude: 0, longitude: 0 });
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getCurrentPosition = () => {
    setIsLoading(true);
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(function(position) {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        setCoords({ latitude, longitude });
      });
    } else {
      alert("Geolocation not supported")
    }
    setIsLoading(false);
  }

  useEffect(() => {
    getCurrentPosition();
  }, []);

  const handleClick = () => {
    setIsLoading(true);
    setTimeout(() => {
      getCurrentPosition();
    }, 2500);
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-start pt-24 p-10 md:p-24 gap-10">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          Get started by editing&nbsp;
          <code className="font-mono font-bold">src/app/page.tsx</code>
        </p>
      </div>

      <div className="w-full">
        <h1 className="text-xl">Geolocation</h1>
        <hr />
        <div>
          <h3 className="text-lg">Latitude: <small>{coords.latitude}</small></h3>
          <h3 className="text-lg">Longitude: <small>{coords.longitude}</small></h3>
        </div>
        <button className='m-5 bg-slate-900 text-white rounded-full' onClick={handleClick} disabled={isLoading}>{isLoading ? "Loading..." : "Reload"}</button>
      </div>

    </main>
  )
}
