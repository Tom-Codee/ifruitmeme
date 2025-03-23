// Job details data
const jobDetails = {
    shiba: {
        title: "🐕 Shiba Inu Meme Curator",
        duration: "2 hours",
        pay: "50 $SHIB",
        description: "Step into the wild world of Shiba Inu memes! As a Meme Curator, your mission is to scour the darkest corners of the internet—think X, Discord, and obscure forums—to unearth the freshest, funniest, and most viral Shiba-themed content. You'll be the tastemaker of the $SHIB community, ensuring only the dankest memes make it to the top. A keen eye for humor and a love for canine chaos are required. Bonus points if you can spot a diamond in the rough before it moons!"
    },
    moon: {
        title: "🌙 MoonCoin Hype Ambassador",
        duration: "3 hours",
        pay: "75 $MOON",
        description: "To the moon and beyond! As a MoonCoin Hype Ambassador, your job is to ignite the spark of excitement in the $MOON community. You'll craft electrifying posts, rally the troops on social media, and spread lunar-level enthusiasm wherever you go. Whether it's hosting a Twitter Spaces event or dropping cryptic moon emojis in the right places, your charisma will drive the hype train. Perfect for natural-born shillers with a passion for cosmic gains."
    },
    woof: {
        title: "🐾 WoofCoin Pack Leader",
        duration: "4 hours",
        pay: "120 $WOOF",
        description: "Lead the pack with WoofCoin! As a Pack Leader, you'll organize and execute a virtual or IRL event that gets the $WOOF community barking with excitement. From meme contests to charity dog walks (with a crypto twist), your creativity will set the tone. You'll coordinate with influencers, manage logistics, and ensure the event howls success. Ideal for natural leaders who thrive in chaos and love a good woof-off."
    },
    lizard: {
        title: "🦎 LizardCoin Conspiracy Theorist",
        duration: "Half-day",
        pay: "200 $LIZ",
        description: "Don your tinfoil hat and dive into the shadowy depths of LizardCoin! As a Conspiracy Theorist, your task is to uncover—or invent—wild theories tying $LIZ to extraterrestrial reptilian overlords, secret societies, and blockchain domination. You'll write gripping blog posts, create viral X threads, and keep the community buzzing with intrigue. A flair for storytelling and a knack for the absurd are essential. Who said the truth can’t pay?"
    }
};

// Show job details in modal and disable scroll
function showDetails(jobId) {
    const modal = document.getElementById("jobModal");
    const detailsDiv = document.getElementById("jobDetails");
    const screen = document.querySelector(".screen");
    const job = jobDetails[jobId];

    detailsDiv.innerHTML = `
        <h3>${job.title}</h3>
        <p><strong>Duration:</strong> ${job.duration}</p>
        <p><strong>Pay:</strong> ${job.pay}</p>
        <p>${job.description}</p>
    `;
    modal.style.display = "flex"; // Use flex to center it
    screen.classList.add("no-scroll"); // Disable scroll
}

// Close modal and restore scroll
function closeModal() {
    const modal = document.getElementById("jobModal");
    const screen = document.querySelector(".screen");

    modal.style.display = "none";
    screen.classList.remove("no-scroll"); // Restore scroll
}