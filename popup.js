document.getElementById('setSpeed').addEventListener('click', async () => {
  const speed = document.getElementById('speedVal').value;
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    world: 'MAIN', // This is crucial to access the page's JS variables
    func: (s) => {
      if (window.Runner) {
        Runner.instance_.setSpeed(parseInt(s));
      }
    },
    args: [speed]
  });
  showStatus();
});

document.getElementById('godMode').addEventListener('click', async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    world: 'MAIN',
    func: () => {
      if (window.Runner) {
        Runner.prototype.gameOver = function() {};
        console.log("God Mode Activated");
      }
    }
  });
  showStatus();
});

function showStatus() {
  const msg = document.getElementById('msg');
  msg.style.display = 'block';
  setTimeout(() => msg.style.display = 'none', 2000);
}
