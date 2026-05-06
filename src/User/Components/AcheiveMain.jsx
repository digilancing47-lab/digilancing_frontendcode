import React from 'react';
import { motion } from 'framer-motion';
import { Lock, Trophy, Star, Zap, Target, Crown, Gem, Flame } from 'lucide-react';
import f1 from "../Assets/cup.png";
import b1 from "../Assets/b_1.png";
import b2 from "../Assets/b_2.png";
import b3 from "../Assets/b_3.png";

const achievements = [
  { title: '10 Lakhs', subtitle: 'Rising Star', description: 'Complete previous levels to unlock', level: 1, icon: <Star className="w-5 h-5" />, gradient: 'from-[#1e3a8a] via-[#3b82f6] to-[#06b6d4]' },
  { title: '20 Lakhs', subtitle: 'Power Player', description: 'Complete previous levels to unlock', level: 2, icon: <Zap className="w-5 h-5" />, gradient: 'from-[#7c3aed] via-[#a855f7] to-[#e879f9]' },
  { title: '? Lakhs', subtitle: 'Goal Crusher', description: 'Complete previous levels to unlock', level: 3, icon: <Target className="w-5 h-5" />, gradient: 'from-[#b45309] via-[#f59e0b] to-[#fbbf24]' },
  { title: '? Lakhs', subtitle: 'Elite Earner', description: 'Complete previous levels to unlock', level: 4, icon: <Crown className="w-5 h-5" />, gradient: 'from-[#065f46] via-[#10b981] to-[#34d399]' },
  { title: '? Lakhs', subtitle: 'Diamond Rank', description: 'Complete previous levels to unlock', level: 5, icon: <Gem className="w-5 h-5" />, gradient: 'from-[#be123c] via-[#f43f5e] to-[#fb7185]' },
  { title: '? Lakhs', subtitle: 'Legend Status', description: 'Complete previous levels to unlock', level: 6, icon: <Flame className="w-5 h-5" />, gradient: 'from-[#0e7490] via-[#06b6d4] to-[#67e8f9]' },
  { title: '? Lakhs', subtitle: 'Titan League', description: 'Complete previous levels to unlock', level: 7, icon: <Trophy className="w-5 h-5" />, gradient: 'from-[#9333ea] via-[#c026d3] to-[#e879f9]' },
  { title: '? Crore', subtitle: 'Ultimate Champion', description: 'Complete previous levels to unlock', level: 8, icon: <Crown className="w-5 h-5" />, gradient: 'from-[#1e3a8a] via-[#6366f1] to-[#a855f7]' },
];

const stats = [
  { value: '0', label: 'Achievements Unlocked', icon: b1, gradient: 'from-[#1e3a8a] via-[#3b82f6] to-[#06b6d4]' },
  { value: '8', label: 'Goals Remaining', icon: b2, gradient: 'from-[#7c3aed] via-[#a855f7] to-[#e879f9]' },
  { value: '0%', label: 'Progress Completion', icon: b3, gradient: 'from-[#b45309] via-[#f59e0b] to-[#fbbf24]' },
];

const AchievementPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center pb-10">

      {/* Header */}
      <div className="w-full rounded-3xl p-8 flex flex-col items-center text-center bg-gradient-to-br from-[#1e3a8a] via-[#3b82f6] to-[#06b6d4] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-60 h-60 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-40 h-40 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />
        <div className="relative z-10 flex flex-col items-center">
          <div className="w-20 h-20 rounded-full bg-white/15 backdrop-blur-md flex items-center justify-center mb-4">
            <img src={f1} alt="Trophy" className="h-12 w-12" />
          </div>
          <h1 className="text-3xl font-bold text-white">Your Achievements</h1>
          <p className="text-white/70 mt-2 max-w-md text-sm">
            Track your progress and unlock powerful rewards
          </p>
          <div className="mt-5 w-full max-w-xs">
            <div className="flex justify-between text-[11px] text-white/50 mb-1">
              <span>Progress</span>
              <span>0 / 8</span>
            </div>
            <div className="w-full h-2 rounded-full bg-white/10">
              <div className="h-full rounded-full bg-white/40 w-[0%]" />
            </div>
          </div>
        </div>
      </div>

      {/* Achievement Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-10 w-full px-3">
        {achievements.map((a, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08, type: 'spring', stiffness: 100 }}
            className={`group relative rounded-2xl overflow-hidden bg-gradient-to-br ${a.gradient} p-[1px]`}
          >
            <div className={`relative bg-gradient-to-br ${a.gradient} rounded-2xl p-5 h-full overflow-hidden opacity-95`}>
              {/* Decorative circles */}
              <div className="absolute -top-8 -right-8 w-24 h-24 bg-white/10 rounded-full group-hover:scale-150 transition-transform duration-500" />
              <div className="absolute -bottom-6 -left-6 w-20 h-20 bg-white/5 rounded-full group-hover:scale-125 transition-transform duration-500" />

              {/* Level badge */}
              <div className="relative flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center text-white group-hover:bg-white/25 transition-colors">
                  {a.icon}
                </div>
                <span className="text-[10px] font-bold text-white/70 bg-white/15 px-2.5 py-1 rounded-full uppercase tracking-wider">
                  Lvl {a.level}
                </span>
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold text-white">{a.title}</h3>
              <p className="text-sm font-semibold text-white/80 mt-1">{a.subtitle}</p>
              <p className="text-xs text-white/50 mt-2">{a.description}</p>

              {/* Progress */}
              <div className="mt-4 w-full h-1.5 rounded-full bg-white/15">
                <div className="h-full rounded-full bg-white/30 w-[0%]" />
              </div>

              {/* Lock status */}
              <div className="mt-4 flex items-center gap-2 bg-white/10 rounded-lg px-3 py-2">
                <Lock className="w-3.5 h-3.5 text-white/60" />
                <span className="text-xs text-white/60 font-medium">Locked</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mt-14 w-full max-w-4xl px-4">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className={`relative rounded-2xl overflow-hidden bg-gradient-to-br ${stat.gradient} p-[1px]`}
          >
            <div className={`bg-gradient-to-br ${stat.gradient} rounded-2xl p-6 flex flex-col items-center relative overflow-hidden opacity-95`}>
              <div className="absolute -top-6 -right-6 w-20 h-20 bg-white/10 rounded-full" />
              <div className="w-14 h-14 rounded-full bg-white/15 flex items-center justify-center mb-3">
                <img src={stat.icon} alt={stat.label} className="h-7 w-7" />
              </div>
              <p className="text-2xl font-bold text-white">{stat.value}</p>
              <p className="text-xs text-white/70 mt-1 text-center">{stat.label}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default AchievementPage;
