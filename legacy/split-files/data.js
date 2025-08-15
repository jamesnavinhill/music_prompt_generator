export const musicData = {
    styles: [
        { name: "Chillhop", id: "chillhop" },
        { name: "Lo-Fi", id: "lofi" },
        { name: "Neo-Soul", id: "neo-soul" },
        { name: "R&B", id: "rnb" },
        { name: "Hip-Hop", id: "hiphop" },
        { name: "Gospel", id: "gospel" },
        { name: "EDM", id: "edm" },
        { name: "Trap", id: "trap" }
    ],
    sections: [
        {
            name: "CORE FOUNDATION",
            id: "core",
            columns: ["Genre/Style", "BPM/Tempo", "Key/Scale", "Time Signature"]
        },
        {
            name: "RHYTHM SECTION",
            id: "rhythm",
            columns: ["Drum Kit Style", "Kick Pattern", "Snare/Clap Style", "Hi-hat Pattern", "Percussion Elements"]
        },
        {
            name: "BASS FOUNDATION",
            id: "bass",
            columns: ["Bass Type", "Bass Pattern/Style", "Bass Tone/Character"]
        },
        {
            name: "MELODIC ELEMENTS",
            id: "melodic",
            columns: ["Lead Instrument", "Chord Progression", "Harmonic Movement", "Secondary Melodic"]
        },
        {
            name: "TEXTURE & ATMOSPHERE",
            id: "texture",
            columns: ["Ambient Elements", "Vocal Elements", "Sound Effects", "Spatial Elements"]
        },
        {
            name: "PRODUCTION & CHARACTER",
            id: "production",
            columns: ["Mix Style", "Effects Processing", "Overall Vibe", "Era/Time Period"]
        }
    ],
    options: {
        chillhop: {
            core: [
                ["Chillhop", "Jazzy Chillhop", "Ambient Chillhop"],
                ["70-80 BPM", "80-90 BPM", "90-100 BPM"],
                ["C Major", "A Minor", "F Major"],
                ["4/4", "6/8", "7/8"]
            ],
            rhythm: [
                ["Vintage Acoustic", "Lo-Fi Electronic", "Jazz Brushes"],
                ["Laid-back Swing", "Subtle Sidestick", "Minimal Thump"],
                ["Crisp Snap", "Soft Rim", "Vinyl Crack"],
                ["Open/Closed", "Subtle Swing", "Ghost Notes"],
                ["Shakers", "Finger Snaps", "Vinyl Crackle"]
            ],
            bass: [
                ["Warm Synth", "Upright Bass", "Electric Bass"],
                ["Walking Bass", "Simple Root", "Melodic Runs"],
                ["Smooth & Rounded", "Warm Analog", "Deep & Woody"]
            ],
            melodic: [
                ["Electric Piano", "Mellow Synth", "Jazz Guitar"],
                ["ii-V-I", "vi-IV-I-V", "Modal Jazz"],
                ["Smooth Voice Leading", "Chromatic Movement", "Suspended Chords"],
                ["Soft Strings", "Muted Trumpet", "Flute Melody"]
            ],
            texture: [
                ["Warm Pads", "Subtle Strings", "Vinyl Texture"],
                ["Jazz Vocal Samples", "Spoken Word", "No Vocals"],
                ["Rain Sounds", "Cafe Ambience", "Vinyl Pops"],
                ["Warm Reverb", "Stereo Wide", "Intimate Close"]
            ],
            production: [
                ["Clean & Warm", "Lo-Fi Dusty", "Vintage Analog"],
                ["Tape Saturation", "Subtle Compression", "Analog Warmth"],
                ["Relaxed & Chill", "Contemplative", "Nostalgic"],
                ["90s Jazz", "Modern Chill", "Vintage Soul"]
            ]
        },
        lofi: {
            core: [
                ["Lo-Fi Hip-Hop", "Dusty Lo-Fi", "Bedroom Lo-Fi"],
                ["60-70 BPM", "70-80 BPM", "80-90 BPM"],
                ["D Minor", "F Major", "Bb Major"],
                ["4/4", "Swing 4/4", "Half-Time"]
            ],
            rhythm: [
                ["Dusty Vinyl", "Analog Drum Machine", "Tape Saturated"],
                ["Muffled Thump", "Vintage 808", "Cardboard Kick"],
                ["Dusty Snap", "Muted Clap", "Cardboard Snare"],
                ["Crackling Hi-Hats", "Lo-Fi Shuffle", "Vinyl Hiss"],
                ["Record Crackle", "Dusty Shakers", "Tape Hiss"]
            ],
            bass: [
                ["Warm 808", "Muffled Synth Bass", "Analog Sub"],
                ["Simple Boom-Bap", "Lazy Groove", "Off-Beat Bass"],
                ["Saturated & Warm", "Muffled & Deep", "Analog Fuzzy"]
            ],
            melodic: [
                ["Dusty Piano", "Warm Rhodes", "Vintage Synth"],
                ["Simple Triads", "Jazz Extensions", "Modal Minor"],
                ["Lazy Voice Leading", "Vintage Modulation", "Tape Flutter"],
                ["Dusty Guitar", "Lo-Fi Bells", "Vintage Horns"]
            ],
            texture: [
                ["Analog Strings", "Dusty Atmosphere", "Tape Saturation"],
                ["Vinyl Vocal Chops", "Dusty Samples", "Minimal Vocals"],
                ["Vinyl Crackle", "Room Tone", "Analog Hiss"],
                ["Analog Saturation", "Muffled Space", "Vintage Mono"]
            ],
            production: [
                ["Dusty Vintage", "Analog Compressed", "Tape Warped"],
                ["Analog Distortion", "Tape Compression", "Vintage EQ"],
                ["Dreamy & Nostalgic", "Melancholic", "Cozy & Intimate"],
                ["90s Hip-Hop", "Vintage Bedroom", "Dusty Vinyl Era"]
            ]
        },
        "neo-soul": {
            core: [
                ["Neo-Soul", "Alternative Soul", "Contemporary Soul"],
                ["85-95 BPM", "95-105 BPM", "105-115 BPM"],
                ["E Minor", "A Major", "D Major"],
                ["4/4", "Neo-Soul Swing", "6/8"]
            ],
            rhythm: [
                ["Live Acoustic", "Hybrid Electronic", "Vintage Ludwig"],
                ["Neo-Soul Groove", "Syncopated Kick", "Ghost Kick"],
                ["Fat Snare", "Rim Click", "Layered Clap"],
                ["Complex Hi-Hats", "Neo Shuffle", "Crisp 16ths"],
                ["Live Percussion", "Congas & Bongos", "Tambourine Accents"]
            ],
            bass: [
                ["Fender Bass", "Synth Bass", "Upright Bass"],
                ["Syncopated Groove", "Melodic Bass", "Pocket Playing"],
                ["Punchy & Round", "Warm Tube", "Vintage Moog"]
            ],
            melodic: [
                ["Fender Rhodes", "Wurlitzer", "Neo-Soul Guitar"],
                ["Complex Jazz", "Extended Chords", "Altered Dominants"],
                ["Sophisticated Movement", "Chromatic Bass Movement", "Modal Interchange"],
                ["Live Strings", "Horn Section", "Gospel Organ"]
            ],
            texture: [
                ["Lush Strings", "Warm Organ", "Analog Pads"],
                ["Soulful Vocals", "Gospel Harmonies", "Ad-libs"],
                ["Studio Ambience", "Room Reverb", "Vinyl Texture"],
                ["Studio Space", "Analog Reverb", "Wide Stereo"]
            ],
            production: [
                ["Warm Analog", "Live Studio", "Vintage Console"],
                ["Analog Compression", "Tube Saturation", "Tape Delay"],
                ["Soulful & Smooth", "Sophisticated", "Emotional & Deep"],
                ["90s Soul", "2000s Neo", "Classic Motown"]
            ]
        },
        rnb: {
            core: [
                ["Contemporary R&B", "Classic R&B", "Alt R&B"],
                ["90-100 BPM", "100-110 BPM", "110-120 BPM"],
                ["Bb Major", "G Minor", "Eb Major"],
                ["4/4", "R&B Swing", "Half-Time Shuffle"]
            ],
            rhythm: [
                ["Tight & Punchy", "808 Hybrid", "Live Drums"],
                ["Punchy 808", "Sub Heavy", "Syncopated Pattern"],
                ["Crisp Clap", "Layered Snare", "Tight Snap"],
                ["Modern Hi-Hats", "Trap Influenced", "Classic R&B"],
                ["Percussion Fills", "Shakers", "Finger Snaps"]
            ],
            bass: [
                ["Sub Bass", "Analog Synth", "Electric Bass"],
                ["Modern Groove", "Syncopated Funk", "Smooth Pocket"],
                ["Deep & Punchy", "Warm Tube", "Modern Clean"]
            ],
            melodic: [
                ["Modern Keys", "Vintage Rhodes", "Smooth Guitar"],
                ["Contemporary", "Gospel Influenced", "Jazzy Extensions"],
                ["Smooth Transitions", "Modern Voicing", "Soulful Movement"],
                ["Smooth Synths", "Vocal Harmonies", "String Section"]
            ],
            texture: [
                ["Lush Pads", "Smooth Strings", "Warm Atmosphere"],
                ["Lead Vocals", "Harmony Stacks", "Vocal Runs"],
                ["Studio Polish", "Breath Sounds", "Subtle FX"],
                ["Polished Space", "Modern Reverb", "Intimate Vocals"]
            ],
            production: [
                ["Modern Polish", "Vintage Warmth", "Contemporary Mix"],
                ["Modern Compression", "Vocal Processing", "Subtle Auto-tune"],
                ["Smooth & Sensual", "Emotional & Powerful", "Contemporary Cool"],
                ["90s R&B", "2000s Smooth", "Modern R&B"]
            ]
        },
        hiphop: {
            core: [
                ["Boom Bap", "Trap", "Conscious Hip-Hop"],
                ["85-95 BPM", "130-140 BPM (Trap)", "90-100 BPM"],
                ["C Minor", "E Minor", "F# Minor"],
                ["4/4", "Trap Timing", "Boom Bap Swing"]
            ],
            rhythm: [
                ["Punchy Sampled", "808 Heavy", "Vintage Breaks"],
                ["Booming 808", "Punchy Kick", "Sub Heavy Kick"],
                ["Crisp Snare", "Trap Snare", "Vintage Break"],
                ["Trap Rolls", "Classic Hi-Hats", "Open Hats"],
                ["Vocal Chops", "Vinyl Scratches", "Percussion Hits"]
            ],
            bass: [
                ["Deep 808", "Synth Bass", "Sampled Bass"],
                ["Simple Pattern", "Sliding 808s", "Syncopated Bass"],
                ["Sub Heavy", "Distorted 808", "Vintage Bass"]
            ],
            melodic: [
                ["Dark Synths", "Piano Samples", "Brass Stabs"],
                ["Simple Loops", "Minor Progressions", "Modal Dark"],
                ["Minimal Changes", "Dramatic Drops", "Tension Building"],
                ["String Hits", "Vocal Samples", "Orchestral Stabs"]
            ],
            texture: [
                ["Dark Atmosphere", "Urban Textures", "Minimal Pads"],
                ["Rap Vocals", "Vocal Samples", "Ad-libs"],
                ["Vinyl Crackle", "Urban Ambience", "Tape Stops"],
                ["Wide Stereo", "Punchy Mono", "Spatial Effects"]
            ],
            production: [
                ["Hard & Punchy", "Lo-Fi Dusty", "Modern Clean"],
                ["Heavy Compression", "Distortion", "Vinyl Simulation"],
                ["Aggressive & Hard", "Dark & Moody", "Confident Swagger"],
                ["90s Golden Age", "Trap Modern", "Old School"]
            ]
        },
        gospel: {
            core: [
                ["Traditional Gospel", "Contemporary Gospel", "Neo Gospel"],
                ["100-110 BPM", "110-120 BPM", "120-130 BPM"],
                ["Ab Major", "Db Major", "F Major"],
                ["4/4", "Gospel Shuffle", "12/8"]
            ],
            rhythm: [
                ["Live Acoustic", "Punchy Modern", "Vintage Gospel"],
                ["Gospel Chops", "Four on Floor", "Syncopated Gospel"],
                ["Backbeat Snare", "Gospel Fills", "Rim Click Accent"],
                ["Driving 16ths", "Gospel Chops", "Shuffle Hi-Hats"],
                ["Live Percussion", "Tambourine", "Hand Claps"]
            ],
            bass: [
                ["Electric Bass", "Synth Bass", "Upright Bass"],
                ["Gospel Walking", "Root-Fifth", "Melodic Gospel"],
                ["Warm & Punchy", "Vintage Tube", "Modern Tight"]
            ],
            melodic: [
                ["Hammond Organ", "Gospel Piano", "Electric Piano"],
                ["Gospel Progressions", "Church Chords", "Extended Harmony"],
                ["Gospel Runs", "Passing Chords", "Chromatic Gospel"],
                ["Gospel Organ", "Brass Section", "String Section"]
            ],
            texture: [
                ["Church Atmosphere", "Warm Reverb", "Inspirational Pads"],
                ["Gospel Choir", "Lead Vocals", "Call & Response"],
                ["Church Reverb", "Congregation", "Organ Leslie"],
                ["Church Space", "Cathedral Reverb", "Intimate Worship"]
            ],
            production: [
                ["Live Church", "Vintage Gospel", "Modern Worship"],
                ["Analog Warmth", "Tube Compression", "Vintage Reverb"],
                ["Uplifting & Joyful", "Spiritual & Moving", "Celebratory"],
                ["Classic Gospel", "90s Contemporary", "Modern Worship"]
            ]
        },
        edm: {
            core: [
                ["House", "Progressive House", "Deep House"],
                ["120-128 BPM", "128-132 BPM", "132-140 BPM"],
                ["A Minor", "C Major", "G Minor"],
                ["4/4", "Straight 4/4", "Dance Timing"]
            ],
            rhythm: [
                ["Electronic Punchy", "Layered Samples", "Analog Drums"],
                ["Four on Floor", "Deep House Kick", "Punchy Dance"],
                ["Clap & Snare", "Layered Percussion", "Analog Snare"],
                ["Closed/Open Pattern", "Driving 16ths", "Filtered Hi-Hats"],
                ["Percussion Loops", "Ethnic Percussion", "Electronic Hits"]
            ],
            bass: [
                ["Deep Sub", "Synth Bass", "Reese Bass"],
                ["Simple Pattern", "Driving Bass", "Melodic Bass"],
                ["Deep Sub", "Warm Analog", "Distorted Bass"]
            ],
            melodic: [
                ["Lead Synth", "Pluck Synth", "Arp Synth"],
                ["Simple House", "Progressive Build", "Minor Emotional"],
                ["Filter Sweeps", "Build-ups", "Tension & Drops"],
                ["Arpeggios", "Stab Chords", "Pad Layers"]
            ],
            texture: [
                ["Atmospheric Pads", "Sweep FX", "Ambient Layers"],
                ["Vocal Chops", "Dance Vocals", "Pitched Vocals"],
                ["Risers & Sweeps", "White Noise", "Impact Hits"],
                ["Wide Stereo", "Dance Reverb", "Club Space"]
            ],
            production: [
                ["Loud & Punchy", "Clean Digital", "Analog Warmth"],
                ["Sidechain Compression", "Filter Automation", "Reverb & Delays"],
                ["Energetic & Uplifting", "Emotional Progressive", "Dance Euphoric"],
                ["90s House", "2000s Progressive", "Modern EDM"]
            ]
        },
        trap: {
            core: [
                ["Trap", "Drill", "Hybrid Trap"],
                ["140-150 BPM", "130-140 BPM", "150-160 BPM"],
                ["C# Minor", "F Minor", "G# Minor"],
                ["4/4", "Half-Time", "Triplet Flow"]
            ],
            rhythm: [
                ["808 Kit", "Drill Kit", "Hybrid Kit"],
                ["Heavy 808", "Scattered Kick", "Distorted Kick"],
                ["Sharp Snare", "Rimshot", "Metallic Clap"],
                ["Triplet Hi-Hats", "Complex Rolls", "Filtered Hats"],
                ["Chants", "Gunshots", "Ad-lib FX"]
            ],
            bass: [
                ["Spinz 808", "Zaytoven 808", "Distorted Sub"],
                ["Gliding 808", "Stutter Bass", "Heavy Sub Pattern"],
                ["Saturated", "Blown-out", "Rattling"]
            ],
            melodic: [
                ["Dark Pluck", "Haunting Bells", "Aggressive Synth Lead"],
                ["Minor Key Melody", "Dissonant Chords", "Arpeggiated Melody"],
                ["Tense Build-ups", "Sudden Drops", "Pitch Bends"],
                ["Ominous Choir", "Reversed Samples", "Synth Brass Stabs"]
            ],
            texture: [
                ["Dark Pads", "Eerie Drones", "Industrial Ambience"],
                ["Aggressive Ad-libs", "Pitched Vocal Chops", "Filtered Vocals"],
                ["Risers", "Impacts", "Explosions"],
                ["Wide and Aggressive", "Claustrophobic", "Surround FX"]
            ],
            production: [
                ["Loud and Compressed", "Distorted and Gritty", "Clean and Punchy"],
                ["Heavy Saturation", "Bitcrushing", "Creative Reverb"],
                ["Dark and Menacing", "Energetic and Aggressive", "Experimental"],
                ["Modern Trap", "UK Drill", "Future Bass Hybrid"]
            ]
        }
    }
};