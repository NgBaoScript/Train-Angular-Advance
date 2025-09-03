import { Component, computed, effect, signal } from '@angular/core';

type Todo = {
  id: number;
  title: string;
  done: boolean;
}

@Component({
  standalone: true,
  selector: 'app-app',
  imports: [],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  // state bằng signals
  todos = signal<Todo[]>([
    { id: 1, title: 'Đọc docs Angular', done: true },
    { id: 2, title: 'Refactor sang standalone', done: false },
  ]);

  // derived state
  remaining = computed(() => this.todos().filter(t => !t.done).length);

  // side-effect quan sát thay đổi
  logEffect = effect(() => {
    console.log('Todos changed:', this.todos());
  });

  toggle(id: number) {
    this.todos.update(list =>
      list.map(t => (t.id === id ? { ...t, done: !t.done } : t))
    );
  }

  add(title: string) {
    const id = Math.max(0, ...this.todos().map(t => t.id)) + 1;
    this.todos.update(list => [...list, { id, title, done: false }]);
  }
}
