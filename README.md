# Swapp full stack assessment

Create a simple website with a table with 3 columns: Name, Amount, Selected. Use any existing design system that you are familiar with (Ant, Material UI etc). When opening the website, load rows from the backend (hardcode e.g. 5 rows there). Put a checkbox in every row in the Selected column. Under the table put a button that says “Generate invoice” - when the button is clicked the backend should generate a simple pdf (just a table) with only the selected rows and a Total Amount (sum all the selected Amounts), store the pdf and return the URL to the client for download.


Not in scope: adding rows, custom design, database persistence, authentication.

Preferred stack: React on frontend and Kotlin (or Java) on backend. Feel free to use open source libraries of your choice.

What we’ll be looking at: API design, separation of concerns, consistent code style, readability (naming, logic), libraries, design patterns used, simplicity, error handling.

Extra points for: unit and integration tests, linter setup, containerization.
