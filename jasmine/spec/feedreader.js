"use strict";
/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
     * a related set of tests. This suite is all about the RSS
     * feeds definitions, the allFeeds variable in our application.
     */
    describe("RSS Feeds", function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty.
         */
        it("are defined", function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        /* A test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it("url defined", function() {
            allFeeds.forEach(function(each) {
                expect(each.url).toBeDefined();
                expect(each.url).not.toBe("");
            });
        });

        /* a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it("name defined", function() {
            allFeeds.forEach(function(each) {
                expect(each.name).toBeDefined();
                expect(each.name).not.toBe("");
            });
        });
    });

    describe("The menu", function() {
        /* TODO: Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
        it("menu hidden", function() {
            expect(document.body.classList.contains("menu-hidden")).toBe(true);
        });

        /* TODO: Write a test that ensures the menu changes
         * visibility when the menu icon is clicked. This test
         * should have two expectations: does the menu display when
         * clicked and does it hide when clicked again.
         */
        it("menu toggles", function() {
            const menuIcon = $(".menu-icon-link");

            menuIcon.trigger("click");
            expect(document.body.classList.contains("menu-hidden")).toBe(false);

            menuIcon.trigger("click");
            expect(document.body.classList.contains("menu-hidden")).toBe(true);
        });
    });

    /* a test suite named "Initial Entries" */
    describe("Initial Entries", function() {
        /* a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         */
        beforeEach(function(done) {
            //let feed = $(".feed");
            loadFeed(0, function() {
                done();
            });
        });

        it("entry element", function(done) {
            expect($(".feed").find(".entry").length > 0).toBe(true);
            done();
        });
    });

    /* a test suite named "New Feed Selection" */
    describe("New Feed Selection", function() {

        /* a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         */
        let entriesStart, entriesEnd;

        beforeEach(function(done) {
            $(".feed").empty(function(done){
                done();
            });

            loadFeed(0, function(done) {
                entriesStart = $(".feed").find(".entry");
            });

            loadFeed(0, function(done) {
                entriesEnd = $(".feed").find(".entry");
            });
        });

        it("new feed", function() {
            console.log(entriesStart);
            console.log(entriesEnd);
            entriesStart.forEach(function(each,i){
                expect(each==entriesEnd[i]).not.toBe(true);
            })
        });
    });
});
