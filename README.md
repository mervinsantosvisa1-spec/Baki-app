# My Workout — Simple Edition

A minimal, installable workout tracker for iPhone or other modern phones. Includes a Baki-inspired home-screen icon and 24 pictured exercises, with highlighted primary muscles and a protective confirmation before marking any exercise completed.

## How to use

1. Open the app. You will see **7 day blocks (Monday–Sunday)**. Today's day is indicated by a small dot.
2. Tap a day. Your workout appears below the blocks.
3. Each card shows the **exercise picture**, **main muscle picture**, **sets and reps**, and an easy-to-tap checkbox.
4. Tap either picture or **How to do it** for a bigger exercise guide.
5. Tap the large checkbox, then **Yes, completed**. Tap **Cancel** to leave it unchanged. Unticking also requires confirmation.
6. Tap **History** at the bottom to see workouts you have already performed.
7. Tap the small settings icon (top right) for **Edit my exercises** and **Backup my workouts**.

## Schedule

| Day | Workout |
|---|---|
| Monday | Anterior — 14 exercises |
| Tuesday | Posterior — 10 exercises |
| Wednesday | Anterior — light, 1 set per exercise |
| Thursday | Posterior — light, 1 set per exercise |
| Friday | Anterior — 14 exercises |
| Saturday | Posterior — 10 exercises |
| Sunday | Anterior — 14 exercises |

Includes **Assisted Dips (Machine)**, **Decline Bench Crunch**, and **Lying Leg Raises** in the anterior session. All movement illustrations are simplified vector drawings rather than photography or instructional video.

## Install on your iPhone via GitHub Pages

1. Create or use your existing GitHub repository for this workout app.
2. Upload **all contents of this folder** to the root of the repository. Keep the `icons` and `exercise-art` folders intact.
3. On GitHub, open **Settings → Pages**, choose **Deploy from a branch**, select `main` and `/ (root)`, then save.
4. Open the resulting website in **Safari**.
5. Tap **Share → Add to Home Screen**. The Baki-inspired icon will appear on your phone.

This is a web app, not a native App Store package. It can work offline after a successful visit to a hosted HTTPS website. It does not require an account.

## Updating from the previous My Workout app

- Publish **to the same GitHub Pages website** to keep the same website origin and use the same on-device workout data.
- The storage key and saved session data format remain compatible with the previous app. Existing workout history and exercise edits are intended to be preserved.
- **Before changing versions, use My plan → Backup my workouts → Download backup.** Browser data can be erased or unavailable if you change domains or delete Safari data.
- If your home-screen app shows an old design immediately after uploading the update, close/reopen or refresh the site once the new service worker has installed.

## Privacy and scope

All completed exercise ticks are stored in your browser's local storage, not in a cloud account. No ads, analytics or accounts. The app tracks completed exercises, not weights or individual sets. This 7-day plan contains a high number of exercises; adjust your training volume and recovery as needed.

## October 2026 — revised anterior workout

The app now includes the requested **14 anterior exercises**, each with **3 sets × 10 reps** on Monday, Wednesday and Friday. Posterior exercises are unchanged and Thursday remains a light day.

**Equipment note:** A conventional Smith machine is not suitable for chest flys or leg extensions. The app retains the exact user-specified exercise names, but the technique guides explain that a pec-deck/cable chest fly and a seated leg-extension machine are the conventional equivalents. The movement sketches are conceptual, not instructional demonstrations of a Smith machine.

The migration preserves completed session snapshots and the posterior program, and updates the anterior routine for new, unstarted sessions. Export a backup before publishing updated app files to the existing origin.

## Revised posterior workout — 22 October 2026

The posterior split now contains exactly **10 exercises**, each **3 sets × 10 reps** on Tuesday, Thursday, and Saturday: Lat Pulldown; Seated Cable Row; Wide Grip Row (Smith Machine); Reverse Pec Deck; Rope Triceps Pushdown; Overhead Triceps Extension; Romanian Deadlift; Hip Thrust; Lying Leg Curl (Smith Machine); Back Extension.

Anterior remains **14 exercises, 3 × 10** on Monday, Wednesday and Friday. Sunday is anterior, 3 × 10. Thursday is no longer a light session.

The muscle maps are static anatomical SVG diagrams with shaded muscle boundaries, brighter targeted regions and an enlarged view in the exercise details. Their purpose is general educational muscle identification, not clinical anatomy.

Equipment clarification: a standard Smith machine cannot perform conventional lying leg curls; use a dedicated prone leg-curl machine or confirm whether your gym has an attachment. Wide-grip row is illustrated as a Smith-machine bent-over row, though there are different variations. Existing completed session history is preserved when publishing the update to the same origin.

## Sunday anterior update — 22 October 2026

Sunday now displays the full 14-exercise Anterior session (3 sets × 10 reps each) instead of a recovery day. All seven days are training days. Weekly progress metrics count 7 workouts, and previous saved history and customisations remain in local storage when deployed to the same website. Because this is an intense 7-day schedule, plan recovery and adapt intensity as needed.
