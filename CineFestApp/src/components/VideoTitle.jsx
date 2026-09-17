import { Star, Info, Play } from 'lucide-react';
import { motion } from "framer-motion";

const VideoTitle = ({ title, overview, rating }) => {
  return (
    <motion.div className='absolute z-10 w-full h-screen flex items-center text-white' initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, ease: "easeOut", delay: 0.7 }}>
        
        <div className='flex w-full px-20 pt-40'>

            {/* Left side of title */}
            <div className='flex w-1/3 flex-col gap-5'>
                <h2 className='text-xl md:text-5xl font-bold font-disney'>{title}</h2>
                <p className='text-sm md:text-md  font-serif'>{overview}</p>
                <div className='flex gap-5'>
                    
                    <motion.button
                        whileHover={{ scale: 1.1, backgroundColor: "#E50914" }}
                        transition={{ type: "spring", stiffness: 500 }}
                        className='bg-midnight text-white px-4 py-2 rounded-lg cursor-pointer flex gap-2'>
                            <Play className="w-6 h-6 text-white" /> Play
                    </motion.button>

                    <motion.button
                        whileHover={{ scale: 1.1, backgroundColor: "#374151" }}
                        transition={{ type: "spring", stiffness: 500 }}
                        className='bg-gray-400 text-white px-4 py-2 rounded-lg cursor-pointer flex gap-2'>
                            <Info className="w-6 h-6 text-white" /> More Info
                    </motion.button>

                </div>
            </div>

            {/* Right side of title */}
            <div className='flex w-2/3 justify-end items-center'>
                <p className='text-lg font-bold font-disney flex items-center gap-2'>
                    {Math.round((rating*10))/10}
                    <Star className='w-6 h-6 fill-yellow-300 stroke-yellow-400' />
                </p>
            </div>
        </div>

    </motion.div>
  )
}

export default VideoTitle;