async function lockedProfile() {
    
    const url = 'http://localhost:3030/jsonstore/advanced/profiles';
    const response = await fetch(url);
    let data = await response.json();

    let main = document.getElementById('main');
    data = Object.values(data);
    for (let i = 0; i < data.length; i++) {
        const currentProfile = data[i];
        console.log(currentProfile);
        
        let profile = document.createElement('div');
        profile.classList.add('profile');
        
        profile.innerHTML = `<img src="./iconProfile2.png" class="userIcon" />
<label>Lock</label>
<input type="radio" name="user${i}Locked" value="lock">
<label>Unlock</label>
<input type="radio" name="user${i}Locked" value="unlock"><br>
<hr>
<label>Username:</label>
<input type="text" name="user${i}Username" value="${currentProfile.username}" disabled readonly />
<button class="show">Show more</button>`;

        let hiddenFields = document.createElement('div');
        hiddenFields.id = `user${i}HiddenFields`;
        hiddenFields.innerHTML = `<hr>
<label>Email:</label>
<input type="email" name="user${i}Email" value="${currentProfile.email}" disabled readonly />
<label>Age:</label>
<input type="email" name="user${i}Age" value=" ${currentProfile.age}" disabled readonly />
</div>`;
        hiddenFields.style.display = 'none';
        
        profile.appendChild(hiddenFields);
        main.appendChild(profile);
    }

    let showButtons = document.querySelectorAll('button.show');
    
    for (let i = 0; i < Array.from(showButtons).length; i++) {
        let currentBtn = Array.from(showButtons)[i];
        
        currentBtn.addEventListener('click', (e) => {
            e.preventDefault();
            let currentProfile = e.target.parentElement;
            let locked = currentProfile.querySelector('input[value="lock"]');
            let unlocked = currentProfile.querySelector('input[value="unlock"]');
            
            let hiddenFields = currentProfile.querySelector('div');

            if (unlocked.checked == true && currentBtn.textContent == 'Show more') {
                hiddenFields.style.display = 'block';
                currentBtn.textContent = 'Hide it';
                
            } else if(unlocked.checked == true && currentBtn.textContent == 'Hide it') {
                hiddenFields.style.display = 'none';
                currentBtn.textContent = 'Show more';
            }
        });
    } 
}


